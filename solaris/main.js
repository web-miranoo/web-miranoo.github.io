function isNotLaptopOrPC() {
  const userAgent = navigator.userAgent.toLowerCase();

  // Common checks for mobile and tablet devices
  const isMobile = /iphone|ipod|android|blackberry|windows phone|opera mini|iemobile/.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)/.test(userAgent);

  return isMobile || isTablet;
}

if (isNotLaptopOrPC()) {
  document.body.innerHTML = "You do not have access / unsupported device";
} else {
  console.log("The user is on a laptop or PC.");
  // Perform actions if the user is on a laptop or desktop
}
