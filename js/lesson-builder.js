import {makeId} from './storage.js';
import {canAddExercise,makeExerciseBlock} from './exercise-bank.js';
import {updateBlock,moveBlock,duplicateBlock,removeBlocks,applyTimes,createGroup,renameGroup,toggleGroup,ungroup,joinBlocks} from './group-tools.js';
export function createLesson(type='Full Body'){return {id:makeId(),name:'Minha aula',type,blocks:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}}
export class LessonBuilder{
 constructor(lesson){this.lesson=lesson}
 add(exercise,work,rest){if(!canAddExercise(this.lesson.blocks,exercise))throw new Error('Este exercício já foi usado nesta aula. Para adicionar, remova o bloco existente.');this.lesson.blocks.push(makeExerciseBlock(exercise,work,rest));this.touch()}
 addCustom(name,work,rest){const clean=name.trim();if(!clean)throw new Error('Informe o nome do exercício.');if(this.lesson.blocks.some(b=>b.name.toLocaleLowerCase('pt-BR')===clean.toLocaleLowerCase('pt-BR')))throw new Error('Este exercício já existe nesta aula.');this.lesson.blocks.push(makeExerciseBlock({name:clean,muscle:'Personalizado',category:'Personalizado'},work,rest));this.touch()}
 edit(id,patch){this.lesson.blocks=updateBlock(this.lesson.blocks,id,patch);this.touch()}
 move(id,direction){this.lesson.blocks=moveBlock(this.lesson.blocks,id,direction);this.touch()}
 duplicate(id){this.lesson.blocks=duplicateBlock(this.lesson.blocks,id);this.touch()}
 remove(ids){this.lesson.blocks=removeBlocks(this.lesson.blocks,ids);this.touch()}
 times(ids,work,rest){this.lesson.blocks=applyTimes(this.lesson.blocks,ids,work,rest);this.touch()}
 group(ids,name){if(ids.length<2)throw new Error('Selecione ao menos dois exercícios para criar um grupo.');this.lesson.blocks=createGroup(this.lesson.blocks,ids,name);this.touch()}
 renameGroup(id,name){this.lesson.blocks=renameGroup(this.lesson.blocks,id,name);this.touch()}
 toggleGroup(id){this.lesson.blocks=toggleGroup(this.lesson.blocks,id);this.touch()}
 ungroup(ids){this.lesson.blocks=ungroup(this.lesson.blocks,ids);this.touch()}
 join(ids,work,rest){this.lesson.blocks=joinBlocks(this.lesson.blocks,ids,work,rest);this.touch()}
 touch(){this.lesson.updatedAt=new Date().toISOString()}
}
