import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
var classNames = require('classnames');


export enum ButtonSize {
	Large = 'lg',
	Small = 'sm',
}

export enum ButtonType {
	Primary = 'primary',
	Default = 'default',
	Danger = 'danger',
	Link = 'link'
}

interface BaseButtonProps {
	className ?: string,
	disabled ?: boolean,
	href ?: string,
	size ?: ButtonSize,
	btnType ?: ButtonType,
	children : React.ReactNode
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
	const {
		className,
		btnType,
		disabled,
		size,
		children,
		href,
		...restProps
	} = props

	const classes = classNames('btn', className, {
		[`btn-${btnType}`] : btnType,
		[`btn-${size}`] : size,
		'disable' : (btnType === ButtonType.Link && disabled)
	})

	if (btnType === ButtonType.Link && href) {
		return (
			<a 
			className={classes}
				href={href}
				{...restProps}
			>
				{children}
			</a>
		)
	} else {
		return (
			<button
			className={classes}
				disabled={disabled}
				{...restProps}
			>
				{children}
			</button>
		)
	}
}

// 设置默认的props
Button.defaultProps = {
	disabled: false,
	btnType: ButtonType.Default
}

export default Button