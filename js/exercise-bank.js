import {makeId} from './storage.js';

// Catálogo mestre: um nome oficial por exercício e grupamento padronizado.
const BASE=[
 ['Supino','Peito','Força'],
 ['Supino Pegada Fechada','Peito','Força'],
 ['Crucifixo','Peito','Força'],
 ['Flexão + Feet Touch','Peito','Força'],
 ['Pulldown','Costas','Puxar'],
 ['Remada Aberta','Costas','Puxar'],
 ['Remada Fechada','Costas','Puxar'],
 ['Remada Alta','Costas','Puxar'],
 ['Remada Unilateral E','Costas','Puxar'],
 ['Remada Unilateral D','Costas','Puxar'],
 ['Crucifixo Invertido','Costas','Força'],
 ['Desenvolvimento','Ombros','Ombros'],
 ['Desenvolvimento Arnold','Ombros','Ombros'],
 ['Elevação Lateral','Ombros','Ombros'],
 ['Elevação Lateral + Elevação Frontal','Ombros','Ombros'],
 ['Bíceps','Bíceps e tríceps','Braços'],
 ['Recuo + Bíceps','Bíceps e tríceps','Braços'],
 ['Tríceps Francês','Bíceps e tríceps','Braços'],
 ['Tríceps Coice E','Bíceps e tríceps','Braços'],
 ['Tríceps Coice D','Bíceps e tríceps','Braços'],
 ['Agachamento Livre','Inferiores','Agachamento'],
 ['Agachamento Neutro','Inferiores','Agachamento'],
 ['Agachamento Sumô','Inferiores','Agachamento'],
 ['Agachamento Goblet','Inferiores','Agachamento'],
 ['Agachamento Lateral','Inferiores','Agachamento'],
 ['Agachamento + Rotação','Inferiores','Agachamento'],
 ['Agachamento + Touch Down','Inferiores','Agachamento'],
 ['Agachamento + Troca de Base','Inferiores','Agachamento'],
 ['Agachamento + Abre e Fecha Tocando o Solo','Inferiores','Agachamento'],
 ['Agachamento + Pico de Contração + Salto','Inferiores','Pliometria'],
 ['Agachamento + Salto','Inferiores','Pliometria'],
 ['Agachamento + Remada Alta','Inferiores','Puxar'],
 ['Agachamento + Desenvolvimento','Inferiores','Ombros'],
 ['Agachamento + Panturrilha','Inferiores','Combinado'],
 ['Avanço','Inferiores','Unilateral / Posterior'],
 ['Avanço + Elevação Lateral','Inferiores','Ombros'],
 ['Afundo E','Inferiores','Unilateral / Posterior'],
 ['Afundo D','Inferiores','Unilateral / Posterior'],
 ['Afundo + Salto','Inferiores','Pliometria'],
 ['Afundo + Troca de Base','Inferiores','Unilateral / Posterior'],
 ['Búlgaro E','Inferiores','Unilateral / Posterior'],
 ['Búlgaro D','Inferiores','Unilateral / Posterior'],
 ['Stiff','Inferiores','Unilateral / Posterior'],
 ['Stiff Unilateral E','Inferiores','Unilateral / Posterior'],
 ['Stiff Unilateral D','Inferiores','Unilateral / Posterior'],
 ['Terra','Inferiores','Unilateral / Posterior'],
 ['Terra + Desenvolvimento','Inferiores','Ombros'],
 ['Panturrilha','Inferiores','Funcional'],
 ['Abdominal Remador','Core e abdômen','Abdominal'],
 ['Abdominal Remador Unilateral','Core e abdômen','Abdominal'],
 ['Abdominal Bicicleta','Core e abdômen','Abdominal'],
 ['Abdominal Oblíquo E','Core e abdômen','Abdominal'],
 ['Abdominal Oblíquo D','Core e abdômen','Abdominal'],
 ['Abdominal + Jab + Direto','Core e abdômen','Combate'],
 ['Abdominal Infra','Core e abdômen','Abdominal'],
 ['Abdominal Infra Alternado','Core e abdômen','Abdominal'],
 ['Abdominal Supra + Rotação de Tronco','Core e abdômen','Abdominal'],
 ['Superman','Core e abdômen','Abdominal'],
 ['Abdominal + Passar as Pernas por Cima','Core e abdômen','Abdominal'],
 ['Prancha','Core e abdômen','Estabilidade'],
 ['Prancha Alta + Prancha Baixa','Core e abdômen','Estabilidade'],
 ['Prancha Baixa + Prancha Alta','Core e abdômen','Estabilidade'],
 ['Prancha + Feet Touch','Core e abdômen','Estabilidade'],
 ['Prancha Alternada','Core e abdômen','Estabilidade'],
 ['Prancha 3 Apoios E','Core e abdômen','Estabilidade'],
 ['Prancha 3 Apoios D','Core e abdômen','Estabilidade'],
 ['Prancha Tocando o Pé','Core e abdômen','Estabilidade'],
 ['Prancha Abre e Fecha','Core e abdômen','Estabilidade'],
 ['Prancha T','Core e abdômen','Estabilidade'],
 ['Escalador','Cardio e funcional','Cardio'],
 ['Sprawl','Cardio e funcional','Cardio'],
 ['Sprawl + Salto','Cardio e funcional','Pliometria'],
 ['Hop Out Step','Cardio e funcional','Pliometria'],
 ['Sprint','Cardio e funcional','Cardio'],
 ['Corrida Lateral + Touch Down','Cardio e funcional','Cardio'],
 ['Hand Walk','Cardio e funcional','Funcional'],
 ['Senta, Levanta e Pula','Cardio e funcional','Funcional'],
 ['Joelhada no Step E','Cardio e funcional','Combate'],
 ['Joelhada no Step D','Cardio e funcional','Combate'],
 ['Joelhada no Step Alternada','Cardio e funcional','Combate'],
 ['Polichinelo + Desenvolvimento','Cardio e funcional','Ombros'],
 ['Elevação Frontal','Ombros','Isolamento'],
 ['Avanço Alternado','Inferiores','Unilateral'],
 ['Russian Twist','Core e abdômen','Rotação de tronco'],
 ['Salto no Step','Cardio e funcional','Pliometria']
];

const ALIASES={
 'agachamentoabreefechatocandoosolo':'Agachamento + Abre e Fecha Tocando o Solo',
 'agachamentocomrotacao':'Agachamento + Rotação',
 'sprawlcomsalto':'Sprawl + Salto',
 'abdominalsupacomrotacao':'Abdominal Supra + Rotação de Tronco'
};
export const normalizeExerciseKey=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR').replace(/[^a-z0-9]/g,'');
export function canonicalExerciseName(name){const key=normalizeExerciseKey(name);return ALIASES[key]||String(name||'').trim().replace(/\\s+/g,' ')}
export const MUSCLE_ORDER=["Peito","Costas","Ombros","Bíceps e tríceps","Inferiores","Core e abdômen","Cardio e funcional"];
export const INITIAL_EXERCISES=BASE.map(([name,muscle,category])=>({id:makeId(),name,muscle,category,type:'Full Body',available:true,custom:false}));
export const muscles=[...MUSCLE_ORDER];
export function mergeExerciseBanks(saved=[],initial=INITIAL_EXERCISES){
 const merged=new Map();
 for(const item of initial){const key=normalizeExerciseKey(canonicalExerciseName(item.name));const old=(saved||[]).find(x=>normalizeExerciseKey(canonicalExerciseName(x.name))===key);merged.set(key,{...(old||{}),...item,id:old?.id||item.id,name:item.name,muscle:item.muscle,category:item.category,type:old?.type==='Leg Blast'?'Leg Blast':'Full Body',available:old?.available!==false,custom:old?.custom===true})}
 for(const item of saved||[]){const name=canonicalExerciseName(item.name);const key=normalizeExerciseKey(name);if(!key||merged.has(key))continue;merged.set(key,{...item,name,muscle:canonicalMuscle(item.muscle),available:item.available!==false})}
 return [...merged.values()];
}
function canonicalMuscle(value){const key=normalizeExerciseKey(value);const aliases={'peitoral':'Peito','peito':'Peito','membrosinferiores':'Inferiores','inferiores':'Inferiores','core':'Core e abdômen','coreeabdomen':'Core e abdômen','cardioefuncional':'Cardio e funcional','cardioefuncionais':'Cardio e funcional','ombros':'Ombros','costas':'Costas','bicepsetriceps':'Bíceps e tríceps','bicepsetriceps':'Bíceps e tríceps'};return aliases[key]||value||'Personalizado'}
export function addExercise(bank,data){const name=data.name.trim();if(!name)throw new Error('Informe o nome do exercício.');if(bank.some(item=>normalizeExerciseKey(canonicalExerciseName(item.name))===normalizeExerciseKey(canonicalExerciseName(name))))throw new Error('Já existe um exercício com esse nome.');return [...bank,{id:makeId(),name:canonicalExerciseName(name),muscle:data.muscle.trim(),category:(data.category||'Geral').trim(),type:data.type==='Leg Blast'?'Leg Blast':'Full Body',available:true,custom:true}]}
export function updateExercise(bank,id,data){const name=data.name.trim();if(bank.some(item=>item.id!==id&&normalizeExerciseKey(canonicalExerciseName(item.name))===normalizeExerciseKey(canonicalExerciseName(name))))throw new Error('Já existe um exercício com esse nome.');return bank.map(item=>item.id===id?{...item,...data,name:canonicalExerciseName(name),muscle:data.muscle.trim(),category:(data.category||'Geral').trim()}:item)}
export function removeExercise(bank,id){return bank.filter(item=>item.id!==id)}
export function searchExercises(bank,{query='',muscle='',type='',excluded=[]}={}){const q=normalizeExerciseKey(query);return bank.filter(item=>!excluded.includes(item.id)&&(!muscle||item.muscle===muscle)&&(!type||item.type===type)&&(!q||normalizeExerciseKey(item.name).includes(q)||normalizeExerciseKey(item.muscle).includes(q)))}
export function canAddExercise(blocks,exercise){const sameSource=blocks.some(block=>block.sourceId===exercise.id||block.exercises?.some(item=>item.sourceId===exercise.id));if(sameSource)return false;if(exercise.name==='Stiff Unilateral E')return !blocks.some(b=>b.name==='Stiff Unilateral E'||b.exercises?.some(e=>e.name==='Stiff Unilateral E'));if(exercise.name==='Stiff Unilateral D')return !blocks.some(b=>b.name==='Stiff Unilateral D'||b.exercises?.some(e=>e.name==='Stiff Unilateral D'));return true}
export function makeExerciseBlock(exercise,work='00:50',rest='00:10'){return {id:makeId(),name:exercise.name,sourceId:exercise.id||null,muscle:exercise.muscle||'Personalizado',category:exercise.category||'Personalizado',work,rest,groupId:null,exercises:null}}
