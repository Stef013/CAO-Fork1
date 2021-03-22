import Cookies from 'js-cookie'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LanguageSelector = () => {  
  const classes = useStyles();
  const { t, i18n } = useTranslation()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
    Cookies.set("locale", event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{t("languageselector.language")}</InputLabel>
        <Select
          defaultValue={Cookies.get("locale") || "en"}
          onChange={changeLanguage}>

          <MenuItem value="en">English</MenuItem>
          <MenuItem value="nl">Nederlands</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default LanguageSelector