// Load wetfish basic
var $ = require('wetfish-basic');

// Load other stuff
var overlay = require('../ui/overlay');

// Private variable for tracking the current tool in use
var active = false;

// Public object for all tool related functions
var tools =
{
   init: function()
    {
        $('.tools button').on('click', function()
        {
            var tool = $(this).data('tool');

            // If there is a handler function for this tool
            if(typeof(tools[tool]) === "function")
            {
                tools.start();
                active = tool;

                // Close the tools menu
                overlay.close('.tools');

                // Does the user want to see help windows?
                var tooCool = parseInt(localStorage.getItem('tooCoolForHelp'));

                if(!tooCool)
                {
                    // Then open tools help menu
                    overlay.open('.tools-help');

                    // Display help details for this tool
                    $('.tools-help .details').addClass('hidden');
                    $('.tools-help .details.' + tool).removeClass('hidden');
                }
            }
        });

        $('.tools-help .accept-help').on('click', function()
        {
            overlay.close('.tools-help');
        });

        $('.tools-help .enough-help').on('click', function()
        {
            overlay.close('.tools-help');
            localStorage.setItem('tooCoolForHelp', 1);
        });

        // When clicking on a draggable element in tool mode
        $('body').on('click', '.tool-mode .dragon', function(event)
        {
            event.preventDefault();

            // Pass the clicked element to the active tool handler
            tools[active](this);
        });
    },

    // Helper function called whenever tools start being used
    start: function()
    {
        $('body').addClass('tool-mode');
        $('.workspace .dragon').addClass('disabled');
    },

    // Helper function when a tool is finished being used
    stop: function()
    {

    },

    select: function(element)
    {
        // Click handler
        console.log(element);
    },
};

module.exports = tools;
