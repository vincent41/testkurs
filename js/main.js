
new Vue({
    el: "#app",

    data: {
        newMemberFlag: true,
        newMember: {
            name: '',
            glock: 0,
            geld: 0,
            betrag: 0,
        },
        date: "2020-11-01",
        kurses: [
            {
              "date": "2020-11-01",
              "vk": 1.00,
              "ek": 0.90
            },
            {
              "date": "2020-12-01",
              "vk": 1.20,
              "ek": 1.10
            },
            {
              "date": "2021-01-01",
              "vk": 1.40,
              "ek": 1.30
            },
            {
              "date": "2021-02-01",
              "vk": 1.60,
              "ek": 1.50
            },
            {
              "date": "2021-03-01",
              "vk": 1.80,
              "ek": 1.70
            },
            {
              "date": "2021-04-01",
              "vk": 2.00,
              "ek": 1.90
            },
            {
              "date": "2021-05-01",
              "vk": 2.20,
              "ek": 2.10
            },
            {
              "date": "2021-06-01",
              "vk": 2.40,
              "ek": 2.30
            },
            {
              "date": "2021-07-01",
              "vk": 2.60,
              "ek": 2.50
            },
            {
              "date": "2021-08-01",
              "vk": 2.80,
              "ek": 2.70
            },
            {
              "date": "2021-09-01",
              "vk": 3.00,
              "ek": 2.90
            },
            {
              "date": "2021-10-01",
              "vk": 3.20,
              "ek": 3.10
            },
            {
              "date": "2021-11-01",
              "vk": 3.40,
              "ek": 3.30
            },
            {
              "date": "2021-12-01",
              "vk": 3.60,
              "ek": 3.50
            },
            {
              "date": "2022-01-01",
              "vk": 3.80,
              "ek": 3.70
            },
            {
              "date": "2022-02-01",
              "vk": 4.00,
              "ek": 3.90
            },
            {
              "date": "2022-03-01",
              "vk": 4.20,
              "ek": 4.10
            },
            {
              "date": "2022-04-01",
              "vk": 4.40,
              "ek": 4.30
            },
            {
              "date": "2022-05-01",
              "vk": 4.60,
              "ek": 4.50
            },
            {
              "date": "2022-06-01",
              "vk": 4.80,
              "ek": 4.70
            },
            {
              "date": "2022-07-01",
              "vk": 5.00,
              "ek": 4.90
            },
            {
              "date": "2022-08-01",
              "vk": 5.20,
              "ek": 5.10
            },
            {
              "date": "2022-09-01",
              "vk": 5.40,
              "ek": 5.30
            },
            {
              "date": "2022-10-01",
              "vk": 5.60,
              "ek": 5.50
            },
            {
              "date": "2022-11-01",
              "vk": 5.80,
              "ek": 5.70
            },
            {
              "date": "2022-12-01",
              "vk": 6.00,
              "ek": 5.90
            },
            {
              "date": "2023-01-01",
              "vk": 6.20,
              "ek": 6.10
            },
            {
              "date": "2023-02-01",
              "vk": 6.40,
              "ek": 6.30
            },
            {
              "date": "2023-03-01",
              "vk": 6.60,
              "ek": 6.50
            }
          ],
        kasse: 0,
        members: [
            { id: 1, name: "Kunde 1", glock: 0, geld:100, betrag: 0 },
            { id: 6, name: "Kunde 1", glock: 0, geld:100, betrag: 0 },
            { id: 3, name: "Kunde 1", glock: 0, geld:100, betrag: 0 }
        ]
    },
    computed:{
        currentKurs: function(){
            currentDate = moment(this.date).format('YYYY-MM')
            idx = this.kurses.findIndex(i =>  moment(i.date).format('YYYY-MM') == currentDate)
            return this.kurses[idx];
        },
        glockUmlauf: function(){
            glock = this.members.reduce((total, item)=> total + item.glock, 0)
            return glock
        }
    },
    methods: {
        buy: function(id, betrag){
            console.log(id)
            Number.parseFloat(betrag * this.currentKurs.vk).toFixed(2)
            var kosten = betrag * this.currentKurs.vk 
            idx = this.members.findIndex(i => i.id == id)
            if(idx >= 0){
                console.log("buy idx "+idx, glock, this.currentKurs)
                this.members[idx].glock = Number.parseFloat(this.members[idx].glock) + Number.parseFloat(betrag)
                this.members[idx].betrag = 0
                this.members[idx].geld = Number.parseFloat(this.members[idx].geld - kosten).toFixed(2)
                this.kasse = this.kasse + kosten
            }
      },
      sell (id, betrag){
        var kosten = betrag * this.currentKurs.ek 
        idx = this.members.findIndex(i => i.id == id)
        if(idx >= 0){
            console.log("sell kosten "+kosten, 'member geld '+ Number.parseFloat(this.members[idx].geld + kosten).toFixed(2) )
            this.members[idx].glock = Number.parseFloat(this.members[idx].glock) - Number.parseFloat(betrag)
            this.members[idx].betrag = 0
            this.members[idx].geld = (Number.parseFloat(this.members[idx].geld) + kosten).toFixed(2)
            this.kasse = this.kasse - kosten
        }
      },
      addMember (){
        // newObj = Object.assign({}, this.newMember)
        newObj = {...this.newMember}
        let maxId = this.members.reduce((total, item) => item.id > total ? item.id : total, 0)
        newObj.id = ++maxId
        this.members.push(newObj)
        this.newMember.name = ''
      }
    }
  })