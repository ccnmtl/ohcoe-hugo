import { sanitize } from './utils.js';

function demographicQuestions() {
    /* Demographic Questions */
    // Save responses to localStorage
    $('.demographic-questions input[type="text"]').each(function(idx, el){
        $(el).on('blur', function(e){
            var radioId = '#' + e.target.id.replace('-text', '');
            $(radioId)[0].setAttribute('value', e.target.value);
        });
    });
    // When the 'other' radio button is clicked, shift focus to text field
    $('.demographic-questions input[type="radio"]').each(function(idx, el){
        $(el).on('change', function(e){
            var id = e.target.id;
            if (id === 'other-role' || id === 'other-speciality') {
                // show the text field
                $('#' + id + '-text').show().focus();
            } else {
                // hide the text field
                var name = e.target.name;
                if (name === 'role' || name === 'speciality') {
                    $('#other-' + name + '-text').hide();
                }
            }
        });
    });

    $('#demographic-info').on('submit', function(e){
        e.preventDefault();

        var role = sanitize(e.target.elements.role.value);
        var speciality = sanitize(e.target.elements.speciality.value);
        localStorage.setItem('role', role);
        localStorage.setItem('speciality', speciality);
        $('#role-specialty-modal').modal('hide');
    });

    const DEMO_ANSWERS = {
        role: {
            prefer_not_answer: 'Prefer not to answer',
            faculty: 'Faculty',
            resident: 'Resident',
            dentist: 'Dentist',
            student: 'Other'
        },
        speciality: {
            prefer_not_answer: 'Prefer not to answer',
            public_health: 'Public Health',
            general: 'General',
            pediatric: 'Pediatric',
        }
    };

    var role = localStorage.getItem('role');
    var speciality = localStorage.getItem('speciality');

    // Show the form if the values are not set
    if (!role && !speciality) {
        //$('#demographic-info').show();
        $('#role-specialty-modal').modal('show');
    }

    // Render on review pages
    if(document.getElementById('demographic-q-responses') &&
        role && speciality) {
        var roleText = DEMO_ANSWERS.role[role];
        var specialityText = DEMO_ANSWERS.speciality[speciality];

        // If 'other' is set, and there's no value in the DEMO_ANSWERS
        // for the given question, then just use the value in storage.
        if (!roleText) {
            roleText = role;
        }
        if (!specialityText) {
            specialityText = speciality;
        }

        $('#demographic-q-responses').append(
            '<p>Role: ' + roleText + '</p>' +
            '<p>Speciality: ' + specialityText + '</p>'
        );
        $('#demographic-q-responses').show();
    }
}

export { demographicQuestions };
