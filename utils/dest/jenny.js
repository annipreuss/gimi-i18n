
var keysToIgnore=[
'child_about_data_tracking_title',
'child_about_data_tracking_content',
'parent_about_data_tracking_title',
'parent_about_data_tracking_content',
'child_advice_title',
'child_advice_content',
'parent_advice_title',
'parent_advice_content',
'data_knowledge_item_text',
'knowledge_child_item_content',
'knowledge_child_item_header',
'data_tracking_assignment_threshold',
'_permissions_denied',
'vp_help_page_title',
'vp_help_page_content',
'transactions_help_page_title',
'transactions_help_page_content',
'task_editor_title_input_hint_example',
'task_status'];


var keysToDelete=[];
var fs=require('fs');
var rootDir='..';
var dirsToCheck=['components','libs','hocs','i18n','config','reducers'];
var textStringsSvFilePath='./text_strings/client/sv.json';
var TextStrings=fs.readFileSync(textStringsSvFilePath,{encoding:'utf8'});
TextStrings=JSON.parse(TextStrings);
var foundKeys=0;
var ignoredKeys=0;

var checkFile=function checkFile(file,key){
var fileContents=fs.readFileSync(file,{encoding:'utf8'});

var isOk=false;

if(fileContents.indexOf(key)!==-1)isOk=true;

if(key.indexOf('_parent')!==-1){
if(fileContents.indexOf(key.split('_parent')[0])!==-1)isOk=true;
}

if(key.indexOf('_child')!==-1){
if(fileContents.indexOf(key.split('_child')[0])!==-1)isOk=true;
}

return isOk;
};
var checkIfTextStringIsObsolete=function checkIfTextStringIsObsolete(key){
var isOk=false;
dirsToCheck.forEach(function(dirName){
var dir=rootDir+'/'+dirName+'/';
var files=fs.readdirSync(dir);
files.forEach(function(file){
try{
file=dir+'/'+file;

if(checkFile(file,key)){
isOk=true;
}
}catch(e){


}
});
});


if(!isOk){
if(keysToIgnore.some(function(ignoredKey){return key.indexOf(ignoredKey)!==-1;})){ignoredKeys++;}else{
foundKeys++;
keysToDelete.push(key);
console.log(key+'\t\t\t\t\t\t'+TextStrings[key].replace('\n',''));
}
}
};

console.log('****** Begin Scan ********\n');

Object.keys(TextStrings).forEach(function(key){return checkIfTextStringIsObsolete(key);});

console.log('****** Scan Complete ********');
console.log('\n  Ignored text_strings: '+

ignoredKeys+'\n  Found text_strings to delete: '+
foundKeys);
if(process.argv.some(function(x){return x==='f';})){

console.log('\n      Removing '+
foundKeys+' text_strings from '+textStringsSvFilePath+' ..\n      ');

keysToDelete.forEach(function(key){
delete TextStrings[key];
});

TextStrings=JSON.stringify(TextStrings,undefined,2);
fs.unlinkSync(textStringsSvFilePath);
fs.writeFileSync(textStringsSvFilePath,TextStrings,{encoding:'utf8'});

console.log('\n      Done\n      ');


}else{
console.log('\n  run with f to remove '+
foundKeys+' text_strings from '+textStringsSvFilePath+'\n  ');

}