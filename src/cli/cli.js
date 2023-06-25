import{ CategoryService } from './CategoryService';
import fs from 'fs';

const comandoArgs = process.argv

const processarComando = async () => {
    if(comandoArgs[2] === undefined){
        return console.log(new Error('No file/diretory detected'))
    }

    switch (comandoArgs[2]){
        case '--listarCategorias':
            const categoryList = await CategoryService.findCategories()
            console.log(categoryList)

            break;
             
        case '--recuperarCategoriaPorId':
            const productId = Number(args[3])
            const productById = await CategoryService.findCategoryById(productId)
            console.log(productById)

            break;

        case '--inserirCategoria':
            const categoriaObjBody = await fs.promises.readFile(comandoArgs[4], 'utf-8')
            const novaCategoria = await CategoryService.createcategory(categoriaObjBody)
            console.log(novaCategoria, 'Criada com Sucesso')

            break;

        case '--atualizarCategoria':
            const categoriaObj = await fs.promises.readFile(comandoArgs[4], 'utf-8')
            const updateCategory = await CategoryService.updateCategory(comandoArgs[3], categoriaObj)
            console.log(updateCategory, 'Atualizada com sucesso')

            break;

        case '--excluirCategoria':
            const deleteCategory = await CategoryService.deleteCategory(comandoArgs[3])
            console.log(deleteCategory, 'Deletada com sucesso')

            break;

        default:
            console.log("Invalid Comand")
    }
};

processarComando();