function cls(...classNames: any[]) {
	return classNames.filter(Boolean).join(' ');
}

export default cls;
