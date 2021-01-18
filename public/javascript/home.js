// const _title = title();
// export { _title as title };

// function title() { return 'Home' }
//exportamos title

export { title, currentDate };

const title = () => 'Home';
const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const currentDate = date.toLocaleDateString('es-MX', options);