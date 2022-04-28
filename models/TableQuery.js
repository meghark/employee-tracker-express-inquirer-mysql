//Class created to handle common attributes and methods used by table classes.

class TableQuery
 {
     constructor()
     {
         this.select ='';
         this.insert ='';
         this.selectById ='';
         this.delete= '';
         this.update= '';
     }

     getSelect()
    {
        return this.select;
    }

    getInsert()
    {
        return this.insert;
    }

    getSelectById()
    {
        return this.selectById;
    }

    getDelete()
    {
        return this.delete;
    }

    getUpdate()
    {
        return this.update;
    }

  
 }



 export {TableQuery};