import { FieldValues, UseFormGetValues } from "react-hook-form"

export const USER_FORM = [
  {
    name: "firstName", label: "First Name", required: true, type: "text", placeholder: "Enter your first name.", testid: 'input-firstName'
  },
  {
    name: "lastName", label: "Last Name", required: true, type: "text", placeholder: "Enter your last name.",testid: 'input-lastName'
  },
  {
    name: "email", label: "Email", required: true, type: "email", placeholder: "Enter your email.", testid: 'input-email'
  },
  {
    name: "mobile", label: "Mobile", required: true, type: "mobile", placeholder: "Enter your mobile number.",testid: 'input-mobile'
  },
  {
    name: "dob", label: "Date of Birth", required: true, type: "date", placeholder: "Enter your DOB.",testid: 'input-dob'
  },
  {
    name: "gender", label: "Gender", required: true, type: "radio",testid: 'input-gender', options: () => (
      [
        { name: "gender", label: "Male", value: "male" }, { name: "gender", label: "Female", value: "female" }
      ]
    )
  },
  {
    name: "country", label: "Country", required: true, type: "option", placeholder: "Select your country.", testid: 'input-country', options: () => (
      [
        { name: "country", label: "India", value: "India" },
        { name: "country", label: "Australia", value: "Australia" },
        { name: "country", label: "China", value: "China" },
        { name: "country", label: "Japan", value: "Japan" },
      ]
    )
  },
  {
    name: "state", label: "State", required: true, type: "option", placeholder: "Select your state.",testid: 'input-state',
    options: (state) => {
      const value = state.country
      switch (value) {
        case "India": {
          return [
            { name: "state", label: "Chhattisgarh", value: "Chhattisgarh" },
            { name: "state", label: "Delhi", value: "Delhi" },
          ]
        }
        case "Australia": {
          return [
            { name: "state", label: "Sydney", value: "Sydney" },
            { name: "state", label: "Queensland", value: "Queensland" },
          ]
        }
        case "China": {
          return [
            { name: "state", label: "Zhejiang", value: "Zhejiang" },
            { name: "state", label: "Yunnan", value: "Yunnan" },
          ]
        }
        case "Japan": {
          return [
            { name: "state", label: "Hokkaido", value: "Hokkaido" },
            { name: "state", label: "Shikoku", value: "Shikoku" },
          ]
        }
        default: return []
      }
    }
  },
  {
    name: "city", label: "City", required: true, type: "option", placeholder: "Select your city.", testid: 'input-city',
    options: (state) => {
      const value = state.state
      switch (value) {
        case "Chhattisgarh": {
          return [
            { name: "city", label: "Raipur", value: "Raipur" },
            { name: "city", label: "Bhilai", value: "Bhilai" },
          ]
        }
        case "Delhi": {
          return [
            { name: "city", label: "Mehrauli", value: "Mehrauli" },
            { name: "city", label: "Firozabad", value: "Firozabad" },
          ]
        }
        case "Sydney": {
          return [
            { name: "city", label: "Zhejiang", value: "Zhejiang" },
            { name: "city", label: "Yunnan", value: "Yunnan" },
          ]
        }
        case "Queensland": {
          return [
            { name: "city", label: "Rosebery", value: "Rosebery" },
            { name: "city", label: "Alexandria", value: "Alexandria" },
          ]
        }
        case "Yunnan": {
          return [
            { name: "city", label: "Shangri", value: "Shangri" },
            { name: "city", label: "Lijiang", value: "Lijiang" },
          ]
        }
        case "Zhejiang": {
          return [
            { name: "city", label: "Ningbo", value: "Ningbo" },
            { name: "city", label: "Hangzhou", value: "Hangzhou" },
          ]
        }
        case "Shikoku": {
          return [
            { name: "city", label: "Tokushima City", value: "Tokushima City" },
            { name: "city", label: "Matsuyama City", value: "Matsuyama City" },
          ]
        }
        case "Hokkaido": {
          return [
            { name: "city", label: "Kitami", value: "Kitami" },
            { name: "city", label: "Abashiri ", value: "Abashiri " },
          ]
        }
        default: return []
      }
    }
  },
  {
    name: "hobbies", label: "Hobbies", required: true, type: "checkbox-group",testid: 'input-hobby', options: () => (
      [
        { name: "hobbies", label: "Drawing", value: "Drawing" },
        { name: "hobbies", label: "Poetry", value: "Poetry" },
        { name: "hobbies", label: "Yoga", value: "Yoga" },
        { name: "hobbies", label: "Cooking", value: "Cooking" },
      ]
    )
  },
  {
    name: "address", label: "Address", required: true, type: "textarea", placeholder: "Enter your address.", testid: 'input-address'
  },
  {
    name: "termsAndConditions", label: "", required: true, type: "checkbox", checkboxLabel: "I Agree", testid: 'input-termsandconditions'
  },
]

export const userInitialState = {
  firstName: "", lastName: "", email: "", mobile: "", dob: "", gender: "", country: "", state: "", city: "", hobbies: [], address: "", termsAndConditions: true
}