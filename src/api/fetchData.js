export default function fetchData() {
    return fetch('http://localhost:3000/game')
        .then(res => res.json())
        .catch(console.error);
}