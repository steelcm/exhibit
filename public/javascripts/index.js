$(function() {
     $('.grid').masonry({
         itemSelector: '.grid-item',
         columnWidth: '.grid-sizer',
         percentPosition: true
     });
     
     // format and set-up listeners for multi-step form
     var form = $('form');
     var steps = form.find('div.step').hide();
     var currentStepIndex = 0;
     // hide traditional submit
     form.find('div:has(input[type=submit])').hide();
     // add continuation buttons
     form.find('a.btn').show().each(function() {
         $(this).click(function() {
            // POST form
            var jsonData = form.serialize();
            $.post('/api/register', jsonData, function(res){
                // add GUID to form
                var guidInput = form.find('input[name=guid]');
                if(!guidInput.length)
                {
                    $('<input>').attr({
                        type: 'hidden',
                        value: res.guid,
                        id: 'guid',
                        name: 'guid'
                    }).appendTo(form);
                }
            }).always(function(){
                // show next step
                $(steps[currentStepIndex]).hide();
                currentStepIndex = currentStepIndex + 1;
                $(steps[currentStepIndex]).show();
            });
         });
     });
     $(steps[currentStepIndex]).show();  
 });