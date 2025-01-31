$(document).ready(function() {
    $.ajax({
        url: "/text",
        method: "GET",
        success: function(response) {
            $('.type-text' ).each(function() {
                var items = $(this ).attr('title' ) +';' + $(this ).text();
                $(this ).empty().attr('title','' ).teletype({
                    text: [response.text],
                    loop: 0,
                });
            });
        },
        error: function(err) {
            console.log(err);
        },
        complete: function() {
            $(".loader-wrapper").fadeOut(500);
        }
    });
    $('.bck').backToTop({
        iconName:'fas fa-chevron-up',
        fxName :'rightToLeft',
        trigger : 100
    }); 

    $("#contactForm").on("submit", (event) => {
        event.preventDefault();
        $("#contactForm").trigger("reset");
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
            showConfirmButton: false,
        });
    });

    $("#uploadImage").change(function (e) {
        e.preventDefault();
        
        let formData = new FormData();
        let file = $("#uploadImage")[0].files[0];

        if (!file) {
            alert("Please select an image.");
            return;
        }

        formData.append("image", file);

        $.ajax({
            url: "/upload",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                const {imageUrl} = response;
                if(imageUrl) {
                    $("#imageGallery").append(`
                        <div class="col-md-4">
                            <div class="media-card">
                                <a href="${imageUrl}" data-lightbox="imageGallery">
                                    <img src="${imageUrl}" class="img-fluid rounded shadow" alt="${imageUrl}">
                                </a>
                            </div>
                        </div>
                    `);
                    
                }
            },
            error: function () {
                alert("Image upload failed.");
            }
        });
    });
});