'use client';

export class FlyToCartAnimation {
  private animatedIcon: HTMLElement | null = null;
  private animationId: number | null = null;

  createFlyingIconFromPosition(
    startX: number,
    startY: number,
    onComplete?: () => void
  ) {
    // Find the cart button
    const cartButton = document.querySelector(
      '[data-cart-button]'
    ) as HTMLElement;

    if (!cartButton) {
      console.warn('Cart button not found for animation');
      onComplete?.();
      return;
    }

    // Get cart button position
    const endRect = cartButton.getBoundingClientRect();

    // Create animated icon
    const flyingIcon = document.createElement('div');
    flyingIcon.innerHTML = `
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
        <circle cx="8" cy="21" r="1"/>
        <circle cx="19" cy="21" r="1"/>
        <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>
    `;

    // Style the flying icon
    Object.assign(flyingIcon.style, {
      position: 'fixed',
      left: `${startX - 18}px`,
      top: `${startY - 18}px`,
      zIndex: '9999',
      pointerEvents: 'none',
      color: 'hsl(var(--primary))',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transform: 'scale(1) rotate(0deg)',
      opacity: '1',
    });

    document.body.appendChild(flyingIcon);
    this.animatedIcon = flyingIcon;

    // Calculate animation destination
    const deltaX = endRect.left + endRect.width / 2 - startX;
    const deltaY = endRect.top + endRect.height / 2 - startY;

    // Start animation on next frame
    requestAnimationFrame(() => {
      if (this.animatedIcon) {
        // Apply transform for the animation
        this.animatedIcon.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3) rotate(360deg)`;
        this.animatedIcon.style.opacity = '0';
      }
    });

    // Handle animation completion
    const handleAnimationEnd = () => {
      // Remove the flying icon
      if (this.animatedIcon) {
        document.body.removeChild(this.animatedIcon);
        this.animatedIcon = null;
      }

      // Animate cart button (bounce effect)
      if (cartButton) {
        cartButton.style.transition =
          'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        cartButton.style.transform = 'scale(1.2)';

        setTimeout(() => {
          if (cartButton) {
            cartButton.style.transform = 'scale(1)';
            setTimeout(() => {
              cartButton.style.transition = '';
            }, 300);
          }
        }, 150);
      }

      onComplete?.();
    };

    // Set timeout for animation completion
    setTimeout(handleAnimationEnd, 800);

    return { cleanup: () => this.cleanup() };
  }

  createFlyingIcon(startElement: HTMLElement, onComplete?: () => void) {
    // Find the cart button
    const cartButton = document.querySelector(
      '[data-cart-button]'
    ) as HTMLElement;

    if (!cartButton) {
      console.warn('Cart button not found for animation');
      onComplete?.();
      return;
    }

    // Get positions
    const startRect = startElement.getBoundingClientRect();
    const endRect = cartButton.getBoundingClientRect();

    // Create animated icon
    const flyingIcon = document.createElement('div');
    flyingIcon.innerHTML = `
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
        <circle cx="8" cy="21" r="1"/>
        <circle cx="19" cy="21" r="1"/>
        <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>
    `;

    // Style the flying icon
    Object.assign(flyingIcon.style, {
      position: 'fixed',
      left: `${startRect.left + startRect.width / 2 - 18}px`,
      top: `${startRect.top + startRect.height / 2 - 18}px`,
      zIndex: '9999',
      pointerEvents: 'none',
      color: 'hsl(var(--primary))',
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transform: 'scale(1) rotate(0deg)',
      opacity: '1',
    });

    document.body.appendChild(flyingIcon);
    this.animatedIcon = flyingIcon;

    // Calculate animation destination
    const deltaX =
      endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2);
    const deltaY =
      endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2);

    // Start animation on next frame
    requestAnimationFrame(() => {
      if (this.animatedIcon) {
        // Apply transform for the animation
        this.animatedIcon.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3) rotate(360deg)`;
        this.animatedIcon.style.opacity = '0';
      }
    });

    // Handle animation completion
    const handleAnimationEnd = () => {
      // Remove the flying icon
      if (this.animatedIcon) {
        document.body.removeChild(this.animatedIcon);
        this.animatedIcon = null;
      }

      // Animate cart button (bounce effect)
      if (cartButton) {
        cartButton.style.transition =
          'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        cartButton.style.transform = 'scale(1.2)';

        setTimeout(() => {
          if (cartButton) {
            cartButton.style.transform = 'scale(1)';
            setTimeout(() => {
              cartButton.style.transition = '';
            }, 300);
          }
        }, 150);
      }

      onComplete?.();
    };

    // Set timeout for animation completion
    setTimeout(handleAnimationEnd, 800);

    return { cleanup: () => this.cleanup() };
  }

  // Cleanup method
  cleanup() {
    if (this.animatedIcon && this.animatedIcon.parentNode) {
      this.animatedIcon.parentNode.removeChild(this.animatedIcon);
      this.animatedIcon = null;
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

// Hook for using the animation
export function useFlyToCartAnimation() {
  const animation = new FlyToCartAnimation();

  const playAnimation = (
    startElement: HTMLElement,
    onComplete?: () => void
  ) => {
    animation.createFlyingIcon(startElement, onComplete);
  };

  const playAnimationFromPosition = (
    startX: number,
    startY: number,
    onComplete?: () => void
  ) => {
    animation.createFlyingIconFromPosition(startX, startY, onComplete);
  };

  return {
    playAnimation,
    playAnimationFromPosition,
    cleanup: () => animation.cleanup(),
  };
}
