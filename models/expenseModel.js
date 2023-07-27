const mongoose = require('mongoose') ;

const expenseSchema = mongoose.Schema(
    {
        name:{
            type:String ,
            required:[true , "Please enter a product name"]
        } ,
        category : {
            type: String ,
            required : true ,
            default : ''
        },
        date_of_expense : {
            type: Date ,
            required : true ,
            default : Date.now
        },
        amount : {
            type: Number ,
            required : true ,
            default : 0
        },
        created_by : {
            type :String ,
            require:true ,
            default: ''
        } 
    } ,
    {
        timestamps: true
    }
)

const Expense  = mongoose.model('expense_1',expenseSchema) ;
// 'expense_1' will be created inside mongo db cluster which model like studentSchema
module.exports = Expense ;