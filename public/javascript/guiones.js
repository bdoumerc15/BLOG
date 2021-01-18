export { separarConGuion };
const separarConGuion = (postName = '') => {
    const output = postName.toLowerCase().split(' ');
    return output.join('-');
};