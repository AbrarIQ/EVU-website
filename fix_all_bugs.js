const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Locate and remove the Interactive Controls Dock JS block cleanly using index boundaries
const startComment = '/* ═══════════════════════════════════════\n       INTERACTIVE CONTROLS DOCK';
const endLine = 'parallaxToggle.classList.toggle(\'active\');\n      enableParallaxSetting = isActive;\n      parallaxToggle.textContent = isActive ? \'ON\' : \'OFF\';\n    });';

const startIndex = html.indexOf(startComment);
if (startIndex !== -1) {
  const endIndex = html.indexOf(endLine, startIndex);
  if (endIndex !== -1) {
    const fullEndIndex = endIndex + endLine.length;
    console.log(`Found Interactive Controls Dock JS block at index ${startIndex} to ${fullEndIndex}. Deleting...`);
    html = html.substring(0, startIndex) + html.substring(fullEndIndex);
  } else {
    console.log("Could not find the end of the Interactive Controls Dock JS block.");
  }
} else {
  console.log("Could not find the start of the Interactive Controls Dock JS block.");
}

// 2. Fix the CSS trailing comma in body.focus-mode
// Original was:
//     body.focus-mode:not(.chip-focus-mode) #ui,
//     body.focus-mode #progress,
// Let's replace it with:
//     body.focus-mode:not(.chip-focus-mode) #ui,
//     body.focus-mode #progress {
//       opacity: 0 !important;
//       visibility: hidden !important;
//       pointer-events: none !important;
//     }
// Wait, in our current file, let's search what is there.
const badCssTarget = `    body.focus-mode:not(.chip-focus-mode) #ui,
    body.focus-mode #progress,`;
const cleanCssReplacement = `    body.focus-mode:not(.chip-focus-mode) #ui,
    body.focus-mode #progress {
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }`;
html = html.replace(badCssTarget, cleanCssReplacement);


// 3. Fix canvas click listener to use setFocus(i) and toggle zoom correctly
// Clicking a stream should toggle zoom and open the central focus card (#venture-focus)
const currentCanvasClick = `    rc.addEventListener('click', () => {
      if (isChipFocused) {
        showPortfolioList();
      } else if (hoveredVenture >= 0) {
        focusVenture(hoveredVenture);
      }
    });`;
const fixedCanvasClick = `    rc.addEventListener('click', () => {
      if (isChipFocused) {
        showPortfolioList();
      } else if (activeFocusVenture >= 0) {
        // Zoom out if clicked while focused
        setFocus(-1);
      } else if (hoveredVenture >= 0) {
        // Zoom in and show central card
        setFocus(hoveredVenture);
      }
    });`;
html = html.replace(currentCanvasClick, fixedCanvasClick);


// 4. Update ScrollTrigger onUpdate to zoom out of central card when user scrolls
const scrollTriggerTarget = `      onUpdate: self => {
        if (document.body.classList.contains('a11y-active')) return;
        const p = self.progress;
        if (isChipFocused && Math.abs(p - scrollProgress) > 0.01) {
          isChipFocused = false;
          setFocus(-1);
        }
        scrollProgress = p;`;
const scrollTriggerReplacement = `      onUpdate: self => {
        if (document.body.classList.contains('a11y-active')) return;
        const p = self.progress;
        if (isChipFocused && Math.abs(p - scrollProgress) > 0.01) {
          isChipFocused = false;
          setFocus(-1);
        }
        if (activeFocusVenture >= 0 && Math.abs(p - scrollProgress) > 0.01) {
          setFocus(-1);
        }
        scrollProgress = p;`;
html = html.replace(scrollTriggerTarget, scrollTriggerReplacement);


// 5. Upgrade step highlights styling (increase font size and add eye-catching active transition)
const stepStyleTarget = `    .step {
      font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
      color: rgba(0, 255, 65, 0.35); cursor: pointer; background: none; border: none;
      font-family: var(--font-mono); padding: 4px 0;
      transition: color 0.25s, transform 0.25s;
      position: relative;
    }
    .step::after {
      content: '';
      position: absolute;
      right: -12px;
      top: 50%;
      transform: translateY(-50%) scale(0);
      width: 4px;
      height: 4px;
      background: var(--matrix);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--matrix-glow);
      transition: transform 0.25s ease;
    }
    .step.active {
      color: var(--matrix);
      transform: translateX(-12px);
    }
    .step.active::after {
      transform: translateY(-50%) scale(1);
    }
    .step:hover {
      color: var(--matrix);
    }`;

const stepStyleReplacement = `    #progress {
      position: fixed; right: 40px; top: 50%; transform: translateY(-50%); z-index: 50;
      display: flex; flex-direction: column; gap: 12px; align-items: flex-end;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }
    .step {
      font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(0, 255, 65, 0.3); cursor: pointer; background: none; border: none;
      font-family: var(--font-mono); padding: 6px 12px;
      transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
      position: relative;
      border: 1px solid transparent;
      border-radius: var(--radius);
    }
    .step::after {
      content: '';
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%) scale(0);
      width: 5px;
      height: 5px;
      background: var(--matrix);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--matrix-glow);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .step.active {
      color: var(--matrix);
      transform: translateX(-16px);
      border-color: var(--border);
      background: rgba(0, 255, 65, 0.04);
      box-shadow: inset 0 0 8px rgba(0, 255, 65, 0.05);
    }
    .step.active::after {
      transform: translateY(-50%) scale(1);
      right: -12px;
    }
    .step:hover {
      color: var(--matrix);
      background: rgba(0, 255, 65, 0.02);
      border-color: rgba(0, 255, 65, 0.1);
    }`;
html = html.replace(stepStyleTarget, stepStyleReplacement);


// 6. Double check showPanel width adjustment on step highlight
// Make sure showPanel active toggling doesn't override .step.active style transition
fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully fixed all issues!");
