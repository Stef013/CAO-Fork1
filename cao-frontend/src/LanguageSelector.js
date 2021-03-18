import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div onChange={changeLanguage}>
      <select onchange="myFunction()">
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
      </select>
    </div>
  )
}

export default LanguageSelector