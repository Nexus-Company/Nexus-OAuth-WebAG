declare var jQuery: any;
const temp = 'text';
const errorClass = 'error-message';

export function AddErrors(errors: any) {
    Object.keys(errors).forEach(prop => {
        jQuery('#' + prop).addClass('ng-invalid ng-dirty').on('click', removerError)

        let helper = jQuery('#'+prop+ '-help');
        helper.attr(temp, helper.text())
        helper.addClass(errorClass).text(errors[prop][0]);
    })
}

function removerError(obj: any) {
    jQuery(obj.currentTarget)
        .removeClass('ng-invalid')
        .off('click', removerError);
    
    let helper = jQuery(obj.currentTarget)
        .closest('.field')
        .find('[id$="-help"]')
    
    helper.text(helper.attr(temp))
    .removeAttr(temp)
    .removeClass(errorClass);
}