import { FormBuilder } from "./form/FormBuilder";
import { FormOptions } from "./core/components/form/FormOptions";

import './global.sass';

const options = new FormOptions();
options.allowClickIfInvalid = false;
options.needValidate = true;
options.submitButtonText = "Оставить сообщение";
options.submitCallback = (payload) => {
    console.log(payload);
}

let builder = new FormBuilder(options);
builder.buildNameInput();
builder.buildEmailInput();
builder.buildUserMessage();
builder.render(document.getElementById("form"));