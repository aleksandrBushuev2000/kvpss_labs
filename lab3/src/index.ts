import 'bootstrap/js/src/collapse';
import './tasks/sass/global.sass';

let loc = window.location;

if (loc.pathname.indexOf("/table") > -1) {
    import('./tasks/table_entrypoint').then(module => {
        module.default.instance.render(document.getElementById('app'))
    });
} else if (loc.pathname.indexOf("/form") > -1) {
    import('./tasks/form_entrypoint').then(module => {
        module.default.instance.render(document.getElementById('app'));
    });
} else {
    import('./tasks/layout_entrypoint').then(module => {});
}
