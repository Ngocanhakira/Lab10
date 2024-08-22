/* function validate() will validate form data */
function validate() {
    var sid = $("#sid").val();                      // Replacing vanilla JS with jQuery
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();
    var uname = $("#uname").val();
    var genm = $("#genm").prop("checked");
    var genf = $("#genf").prop("checked");

    var errMsg = "";                                // Create variable to store the error message
    var result = true;                              // Assumes no errors
    var pattern = /^[a-zA-Z ]+$/;                   // Regular expression for letters and spaces only

    /* Rule 1, check if all required data are entered */
    if (sid === "") {                               // Check whether User ID is empty
        errMsg += "<li>User ID cannot be empty.</li>";
    }
    if (pwd1 === "") {                              // Check whether Password is empty
        errMsg += "<li>Password cannot be empty.</li>";
    }
    if (pwd2 === "") {                              // Check whether re-typed Password is empty
        errMsg += "<li>Retype password cannot be empty.</li>";
    }
    if (uname === "") {                             // Check whether User Name is empty
        errMsg += "<li>User name cannot be empty.</li>";
    }
    if ((!genm) && (!genf)) {                       // Check whether gender is selected
        errMsg += "<li>A gender must be selected.</li>";
    }

    /* Rule 2, check if the user ID contains an @ symbol */
    if (sid.indexOf('@') === 0) {
        errMsg += "<li>User ID cannot start with an @ symbol.</li>";
    }
    if (sid.indexOf('@') < 0) {
        errMsg += "<li>User ID must contain an @ symbol.</li>";
    }

    /* Rule 3, check if password and retype password are the same */
    if (pwd1 !== pwd2) {
        errMsg += "<li>Passwords do not match.</li>";
    }

    /* Rule 4, check if user name contains only letters and spaces */
    if (!uname.match(pattern)) {
        errMsg += "<li>User name contains symbols.</li>";
    }

    /* Display error message if any error(s) is/are detected */
    if (errMsg !== "") {
        errMsg = "<div id='scrnOverlay'></div>"           // Create screen overlay for errors
               + "<section id='errWin' class='window'><ul>"
               + errMsg                                  // Insert error messages
               + "</ul><a href='#' id='errBtn' class='button'>Close</a></section>";
        
        var numOfItems = ((errMsg.match(/<li>/g)).length) + 6;  // Count the number of error items
        $("body").after(errMsg);                         // Add error message to body
        $("#scrnOverlay").css('visibility', 'visible');  // Make overlay visible
        $("#errWin").css('height', numOfItems.toString() + 'em'); // Adjust window height
        $("#errWin").css('margin-top', (numOfItems/-2).toString() + 'em'); // Center window
        $("#errWin").show();                             // Show the error window
        $("#errBtn").click(function() {                  // Close button functionality
            $("#scrnOverlay").remove();
            $("#errWin").remove();
        });
        result = false;
    }
    return result;
}

/* Function to toggle collapse/expand content */
function toggle() {
    $(this).parent().next().slideToggle();              // Toggle the visibility of the next fieldset
    if ($(this).html() === "[-]") {                     // Update the symbol on the "button"
        $(this).html("[+]");
    } else {
        $(this).html("[-]");
    }
}

/* Link HTML elements to corresponding event functions */
function init() {
    $(".collapse").click(toggle);                       // Link toggle function to click event
    $("#regform").submit(validate);                     // Link validate function to form submission
}

/* Execute function init() once the window is loaded */
$(document).ready(init);                                // Initialize once the document is ready
