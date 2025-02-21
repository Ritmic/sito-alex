
  $(function () {

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });

    // AOS ANIMATION
    AOS.init({
      disable: 'mobile',
      duration: 800,
      anchorPlacement: 'center-bottom'
    });

    //MASONRY LAYOUT GIRD 
    $('.grid').masonry({
      // options
      itemSelector: '.grid-item',
      columnWidth: 370
    });

    // SMOOTHSCROLL NAVBAR
    $(function() {
      $('.navbar a, .hero-text a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });    
  });


  async function loadLinks() {
    try {
        // Fetch the JSON file containing the links
        const response = await fetch('js/links.json'); // Replace with the actual path to your JSON file
        const data = await response.json();

        // Get the container where the grid items will be added
        const gridContainer = document.querySelector('.grid');
        
        // Check if the grid container exists
        if (!gridContainer) {
            console.error('Grid container not found');
            return;
        }

        // Iterate through each link and create the necessary HTML structure
        data.iframes.forEach(link => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.setAttribute('data-aos', 'fade-up');
            gridItem.setAttribute('data-aos-delay', '400');
            
            gridItem.innerHTML = link;
            gridContainer.appendChild(gridItem);
        });
        
        // Load Facebook SDK script after links are loaded
        const fbScript = document.createElement('script');
        fbScript.async = true;
        fbScript.defer = true;
        fbScript.crossOrigin = 'anonymous';
        fbScript.src = 'https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v21.0';
        document.body.appendChild(fbScript);
    } catch (error) {
        console.error('Error loading links:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', loadLinks);
