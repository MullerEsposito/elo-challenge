export const validations = {
  isRequired: (campo: string) => ({ regex: /.+/, description: `O campo ${campo} é obrigatório!` }),
  atLeast1Digit: { regex: /\d/, description: "Deve conter ao menos um dígito!" },
  atLeast10Digits:{ regex: /([\D]?\d[\D]?){11,}/, description: "Deve ter no mínimo 10 dígitos!"},
  atLeastOneCapitalLetter: { regex: /[A-Z]/, description: "Deve conter ao menos uma letra maiúscula!" },
  atLeastOneSpecialCharacter: { regex: /[$*&@#]/, description: "Deve conter ao menos um caractere especial!" },
  atLeast8Chars: { regex: /^[\S]{8,}$/, description: "Deve conter ao menos 8 caracteres!" },
}