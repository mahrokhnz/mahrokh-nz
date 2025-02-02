function cls(...classNames) {
	return classNames.filter(Boolean).join(' ');
}

export default cls;
