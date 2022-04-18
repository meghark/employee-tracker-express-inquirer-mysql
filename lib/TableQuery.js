 class TableQuery
 {
     constructor()
     {
         this.select ='';
         this.insert ='';
         this.selectById ='';
         this.delete= '';
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
  
 }



 module.exports =TableQuery;