const getLocalStorageData = (key: string) => {
	if (typeof window === 'undefined') {
		return null;
	}
	else {
		const data = localStorage.getItem(key);
		if (data) {
			try {
				return JSON.parse(data);
			} catch (error) {
				return data;
			}
		}
		else {
			return null;
		}
	}
}

export default getLocalStorageData;