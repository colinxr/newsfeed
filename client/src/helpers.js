export function authenticateUser() {
	const localStorageRef = localStorage.getItem('newsFeedSession');
	console.log(localStorageRef);

	if (localStorageRef) return true;

	return false
}
