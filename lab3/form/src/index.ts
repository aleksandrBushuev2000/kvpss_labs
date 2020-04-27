import { FormBuilder } from "./form/FormBuilder";
import { FormOptions } from "./core/components/form/FormOptions";

import './global.sass';
import { SnackbarOptions } from "./core/components/snackbar/SnackbarOptions";
import { Snackbar } from "./core/components/snackbar/Snackbar";

const snackbarOptions = new SnackbarOptions();
snackbarOptions.lifetime = 2500;
snackbarOptions.color = "red";
snackbarOptions.message = "Не удалось добавить сообщение. Повторите попытку позже";
snackbarOptions.bottom = true;

const options = new FormOptions<void>();
options.allowClickIfInvalid = false;
options.needValidate = true;
options.submitButtonText = "Оставить сообщение";
options.submitCallback = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(), 1500)
    })
}
options.errorCallback = () => {
    new Snackbar(snackbarOptions).render(document.body);
}

let builder = new FormBuilder<void>(options);
builder.buildNameInput();
builder.buildEmailInput();
builder.buildUserMessage();
builder.render(document.getElementById("form"));