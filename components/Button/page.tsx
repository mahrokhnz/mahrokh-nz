"use client"

import { Button as MaterialButton } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";

interface ButtonProps {
	isFooter?: boolean;
	children?: React.ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
	variant?: "text" | "outlined" | "contained";
	loading?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

function Button({ children, className, ...otherProps }: ButtonProps) {
	const isMobile = useMediaQuery('(max-width: 600px)');

	return (
		<MaterialButton size={isMobile ? 'small' : 'medium'} variant='contained' {...otherProps} className={className}>
			{children}
		</MaterialButton>
	);
}

export default Button;
