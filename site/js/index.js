document.addEventListener("DOMContentLoaded", function() {
    var faqButton = document.getElementById("FAQ");
    var popup = document.getElementById("faqPopup");
    var closeBtn = document.getElementById("closeBtn");
  
    faqButton.addEventListener("click", function() {
      popup.style.display = "block";
    });
  
    closeBtn.addEventListener("click", function() {
      popup.style.display = "none";
    });
  });