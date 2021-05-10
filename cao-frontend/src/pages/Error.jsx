import React from 'react';
import Typography from '@material-ui/core/Typography';
import i18n from '../Components/i18n';

class Error extends React.Component {
    
    render() {
        return (
            <Typography variant="h2" >
                {i18n.t('errorpage.page not found')}
            </Typography>
        )
    }
}
export default Error