import React, {useState} from "react";
var classNames = require('classnames');

export enum AlertType {
    Default = 'default',
    Warning = 'warning',
    Success = 'success',
    Danger = 'danger'
}

interface BaseAlertProps {
	style?:React.CSSProperties;
	closable?:boolean,
	closeText?:string | React.ReactNode,
	message?:string,
	description?:string,
	type?:string,
	className?:string,
	onClose?:() => void
}

const Alert: React.FC<BaseAlertProps> = (props) => {
	const {
		style,
		closable,
		closeText,
		message,
		description,
		type,
		onClose,
		className
	} = props

	const classes = classNames('alert', className, {
		[`alert-${type}`]: type,
	})

	// 通过控制visible来控制Alert的出现和消失
	const [visible, setVisible] = useState(true)

	const handleClose = () => {
		onClose && onClose()
		setVisible(false)
	}

	return visible ? <div className={classes} style={style}>
		<p className="alert-message">{message}</p>
		<p className="alert-description">{description}</p>
		{
			!!closable && <span className="closeBtn" onClick={handleClose}>{closeText || 'x'}</span>
		}
	</div> : null
}

Alert.defaultProps = {
	type: AlertType.Default,
	closable: true
}

export default Alert