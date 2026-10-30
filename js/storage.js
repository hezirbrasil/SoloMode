const KEYS={bank:'wf-solo-bank-v1',lessons:'wf-solo-lessons-v1',current:'wf-solo-current-v1'};
export function read(key,fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch(error){console.error('Falha ao ler armazenamento',error);return fallback}}
export function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch(error){console.error('Falha ao salvar armazenamento',error);return false}}
export const loadBank=()=>read(KEYS.bank,null);
export const saveBank=bank=>write(KEYS.bank,bank);
export const loadLessons=()=>read(KEYS.lessons,[]);
export const saveLessons=lessons=>write(KEYS.lessons,lessons);
export const loadCurrent=()=>read(KEYS.current,null);
export const saveCurrent=lesson=>write(KEYS.current,lesson);
export const makeId=()=>globalThis.crypto?.randomUUID?.()??('id-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10));
export const clone=value=>JSON.parse(JSON.stringify(value));
export function normalizeLesson(lesson){return {...lesson,id:lesson.id||makeId(),name:lesson.name||'Minha aula',type:lesson.type==='Leg Blast'?'Leg Blast':'Full Body',blocks:Array.isArray(lesson.blocks)?lesson.blocks:[],updatedAt:new Date().toISOString()}}
export function exportJson(filename,data){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)}
export function importJson(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>{try{resolve(JSON.parse(String(reader.result)))}catch(error){reject(new Error('O arquivo não contém JSON válido.'))}};reader.onerror=()=>reject(new Error('Não foi possível ler o arquivo.'));reader.readAsText(file)})}
