import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, min, max } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_}を入力してください",
});

extend("max", {
  ...max,
  message: "{_field_}は最大{length}文字です",
});

extend("min", {
  ...min,
  message: "{_field_}は{length}文字以上で入力してください",
});

extend("email", {
  ...email,
  message: "メールの入力形式で入力してください",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
