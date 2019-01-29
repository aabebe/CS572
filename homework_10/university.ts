class University {
    name: string;
    dept: string;

    constructor(name: string, dept: string) {
        this.name = name;
        this.dept = dept;
    }
    graduation(year: number) {
        console.log(`Graduating ${this.dept} ${year} students`);
    }
}

export default University;