# Architecture

- Use CylinderDial for global navigation on all viewport sizes, with a wider radius on desktop, so rotation and selection share one implementation.
- Wrap page content in PageCylinder, leaving the fixed navigation outside, so global section transitions rotate without moving the navigation; respect reduced-motion preferences.