import fs from 'fs';

async function newId(){
    const categoriesList = await fetch('http://localhost:3000/categories')
    let highestId = categoriesList[0].id;
    categoriesList.forEach(categoria => {
        if(highestId < categoria.id){
            highestId = categoria.id;
        }
    });
    return (highestId + 1)
}

export class CategoryService {
    static async findCategories(){
        try{
            const categoriesList = await fetch('http://localhost:3000/categories')
            console.log(`Response status: ${categoriesList.status}`);
    
            return categoriesList.json();
        }
        catch (error){
            console.log(error)
        }

    };

    static async findCategoryById(id){
        try{
            const categorieFetchById = await fetch(`http://localhost:3000/categories${id}`, {method: 'GET'})
            const categoryById  = categorieFetchById.json()

            if(categoryById != undefined){
                console.log(`Response status: ${categoriesList.status}`)

                return categoryById
            } else {
                return (`Response status: 404. Id not found`)
            }
        }
        catch (error){
            console.log(error)
        }
    };
    
    static async createcategory(data){
        try {
            const categoryCreated = await fetch('http://localhost:3000/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
            categoryResponse = await categoryCreated.json()
            console.log(`Response status: ${categoryCreated.status}`)
            return categoryResponse
        }
        catch (error){
            console.log(error)
        }
    };

    static async updateCategory(id, data){
        try{
            const categoryUpdated = await fetch(`http://localhost:3000/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
            categoryResponse = await categoryUpdated.json()
            console.log(`Response status: ${categoryUpdated.status}`)
            return categoryUpdated
        }
        catch (error){
            console.log(error)
        }
    };

    static async deleteCategory(id){
        try{
            const deletedCategory = await fetch(`http://localhost:3000/categories/${id}`, {method: 'DELETE'})
            console.log(`Response status: ${deletedCategory.status}`)
            return true;
        }
        catch (error){
            console.log(error)
        }
    }
}