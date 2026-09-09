( function () {
	'use strict';

	// Scroll progress bar
	var progress = document.getElementById( 'scrollProgress' );
	function updateProgress() {
		if ( ! progress ) {
			return;
		}
		var h = document.documentElement;
		var scrolled = ( h.scrollTop ) / ( h.scrollHeight - h.clientHeight ) * 100;
		progress.style.width = scrolled + '%';
	}
	document.addEventListener( 'scroll', updateProgress, { passive: true } );
	updateProgress();

	// Contact form
	//
	// Zero-backend by default: if the form's "action" still points at the
	// placeholder Formspree URL (see index.html), submitting falls back to
	// a mailto: handoff so the form always works with no setup.
	//
	// Once you connect a real form endpoint (Formspree, Netlify Forms, etc.
	// — see README.md), this same code posts to it with fetch() and shows
	// an inline success message instead, no page reload.
	var form = document.getElementById( 'contactForm' );
	if ( form ) {
		form.addEventListener( 'submit', function ( e ) {
			var action = form.getAttribute( 'action' ) || '';
			var isConfigured = action.indexOf( 'YOUR_FORM_ID' ) === -1 && action.indexOf( 'http' ) === 0;

			if ( ! isConfigured ) {
				e.preventDefault();
				mailtoFallback();
				return;
			}

			e.preventDefault();
			var data = new FormData( form );
			var status = document.getElementById( 'formStatus' );

			fetch( action, {
				method: 'POST',
				body: data,
				headers: { Accept: 'application/json' },
			} )
				.then( function ( response ) {
					if ( response.ok ) {
						form.reset();
						if ( status ) {
							status.textContent = 'Thanks — we\'ll be in touch shortly.';
							status.classList.add( 'form-success' );
						}
					} else {
						mailtoFallback();
					}
				} )
				.catch( function () {
					mailtoFallback();
				} );
		} );
	}

	function mailtoFallback() {
		var name = document.getElementById( 'name' ).value.trim();
		var org = document.getElementById( 'org' ).value.trim();
		var email = document.getElementById( 'email' ).value.trim();
		var domain = document.getElementById( 'domain' ).value;
		var message = document.getElementById( 'message' ).value.trim();
		var contactEmail = 'partnerships@maathavam.com';

		var subject = encodeURIComponent( 'NDA conversation request — ' + domain );
		var body = encodeURIComponent(
			'Name: ' + name + '\nOrganization: ' + org + '\nEmail: ' + email + '\nDomain of interest: ' + domain + '\n\nMessage:\n' + message
		);

		window.location.href = 'mailto:' + contactEmail + '?subject=' + subject + '&body=' + body;
	}
} )();
