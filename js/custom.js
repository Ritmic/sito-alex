
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
        const response = await fetch('links.json'); // Replace with the actual path to your JSON file
        const data = await response.json();

        // Get the container where the grid items will be added
        const gridContainer = document.querySelector('.grid');
        
        // Check if the grid container exists
        if (!gridContainer) {
            console.error('Grid container not found');
            return;
        }

        // Iterate through each link and create the necessary HTML structure
        data.links.forEach(link => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.setAttribute('data-aos', 'fade-up');
            gridItem.setAttribute('data-aos-delay', '400');
            
            const fbPost = document.createElement('div');
            fbPost.classList.add('fb-post', 'mb-4');
            fbPost.setAttribute('data-href', link);
            fbPost.setAttribute('data-width', '350');
            fbPost.setAttribute('data-show-text', 'true');
            
            const blockquote = document.createElement('blockquote');
            blockquote.setAttribute('cite', link);
            blockquote.setAttribute('target', '_top');
            blockquote.classList.add('fb-xfbml-parse-ignore');
            blockquote.innerHTML = `<p>Facebook Post</p>`;
            
            fbPost.appendChild(blockquote);
            gridItem.appendChild(fbPost);
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

$(document).ready(function() {
    $.getJSON('links.json', function(data) {
        let gridContainer = $('.grid');
        
        if (gridContainer.length === 0) {
            console.error('Grid container not found');
            return;
        }
        
        $.each(data.links, function(index, link) {
            let gridItem = $('<div>', {
                class: 'grid-item',
                'data-aos': 'fade-up',
                'data-aos-delay': '400'
            });
            
            let fbPost = $('<div>', {
                class: 'fb-post mb-4',
                'data-href': link,
                'data-width': '350',
                'data-show-text': 'true'
            });
            
            let blockquote = $('<blockquote>', {
                cite: link,
                target: '_top',
                class: 'fb-xfbml-parse-ignore'
            }).html('<p>Facebook Post</p>');
            
            fbPost.append(blockquote);
            gridItem.append(fbPost);
            gridContainer.append(gridItem);
        });
        
        // Load Facebook SDK script after links are loaded
        $('<script>', {
            async: true,
            defer: true,
            crossorigin: 'anonymous',
            src: 'https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v21.0'
        }).appendTo('body');
    }).fail(function() {
        console.error('Error loading links');
    });
});
