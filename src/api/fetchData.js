export default function fetchData() {
    //return fetch('http://localhost:3000/game')
    return fetch('http://local.m-elma365.elmadev:8000/game/4fd45caa-8424-4e4a-b905-6c9b5f75aac8')
        .then(res => res.json())
        .catch(console.error);
}