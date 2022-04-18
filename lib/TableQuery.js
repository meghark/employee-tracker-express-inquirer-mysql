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



 module.exports =TableQuery;