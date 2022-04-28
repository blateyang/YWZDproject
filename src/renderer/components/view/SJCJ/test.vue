<template>
  <div>
    <h3>HTML5 Web SQL 数据库</h3>
     
          <div
            v-for="g in re"
          
          
          >
            {{g}}
          </div>
    
    <button @click="openWebSQL">打开(创建) Web SQL</button>
    <button @click="addItem">新增一条记录</button>
    <button @click="updateItem(5)">修改第一条数据</button>
    <button @click="deleteItem(4)">删除一条记录</button>
    <button @click="getData">查询数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MySQL: null,
      re:null,
    };
  },
  created() {
  },
  mounted() {
       //我们可以使用 openDatabase() 方法来打开已存在的数据库，如果数据库不存在，则会创建一个新的数据库
      this.MySQL = openDatabase("mydb01", "1.0", "Test DB", 2 * 1024 * 1024);
  },
  methods: {
    openWebSQL() {
     

      /**
       * 插入数据
       * 在执行上面的创建表语句后，我们可以插入一些数据：
       */
      this.$db.transaction(function(tx) {
        // const d = tx.executeSql(
        //   "CREATE TABLE IF NOT EXISTS myTable (id unique, log)"
        // );
        // tx.executeSql('INSERT INTO myTable (id, log) VALUES (1, "你好，同学")');
        // tx.executeSql('INSERT INTO myTable (id, log) VALUES (2, "甲乙丙丁")');
        //  tx.executeSql("DELETE FROM myTable WHERE id");
      });
    },
    //新增一条记录
    addItem() {
      this.MySQL.transaction(function(tx) {
        //先查
        tx.executeSql("Select * FROM myTable", [], (tx, results) => {
          console.log("查询结果 =>", results);
          console.log("查询数据长度 =>", results.rows.length);

          //我再根据查询已有数据的最后一条数据的id + 1 生成新id
          let e_id = results.rows[results.rows.length - 1].id + 1;
          let e_log = `Jason Ma到此一游${e_id}`;
          tx.executeSql("INSERT INTO myTable (id,log) VALUES (?, ?)", [
            e_id,
            e_log
          ]);
        });
      });
    },
    //修改一条记录
    updateItem(id) {
      this.MySQL.transaction(function(tx) {
        tx.executeSql("UPDATE myTable SET log='大王叫我来巡山...' WHERE id=?",[id]);
      });
    },
    //删除一条记录
    deleteItem(id) {
      this.MySQL.transaction(function(tx) {
        //既可以动态id方式，也可以
        tx.executeSql("DELETE FROM myTable WHERE id=?", [id]);
        // tx.executeSql("DELETE FROM myTable WHERE id=2");
        console.log("do1")
      });
    },
    //查询
    getData() {
        let _this = this
      _this.MySQL.transaction(function(tx) {
        //   let that = this
        tx.executeSql("Select * FROM myTable WHERE id limit 3", [], (tx, results) => {
            _this.re = results
            
            // console.log(this)
          console.log("查询结果 =>", results);
          console.log("查询数据长度 =>", results.rows);
        });
      });
    }
  }
};
</script>

<style></style>


