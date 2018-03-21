// @flow
export let CategoryGroups = require('../categories/CategoryGroups.json')
export let SavingsGoalCategories = require('../categories/SavingsGoalCategories.json')
export let WithdrawCategories = require('../categories/WithdrawCategories.json')
export let DepositCategories = require('../categories/DepositCategories.json')
export let TaskCategories = require('../categories/TaskCategories.json')

// Make a simple array of colors instead of Colors object for easy compairing

// Make a simple array of CategoryGroups instead of CategoryGroups object for easy compairing
var categoryGroupArray = []
Object.keys(CategoryGroups).forEach(function (key) {
  categoryGroupArray.push(CategoryGroups[key])
})

// Make a simple array of ids for easy compairing
var SavingsGoalCategoryIds = []
Object.keys(SavingsGoalCategories).forEach(function (key) {
  SavingsGoalCategoryIds.push(SavingsGoalCategories[key].id)
})

var WithdrawCategoryIds = []
Object.keys(WithdrawCategories).forEach(function (key) {
  WithdrawCategoryIds.push(WithdrawCategories[key].id)
})

var DepositCategoryIds = []
Object.keys(DepositCategories).forEach(function (key) {
  DepositCategoryIds.push(DepositCategories[key].id)
})

var TaskCategoryIds = []
Object.keys(TaskCategories).forEach(function (key) {
  TaskCategoryIds.push(TaskCategories[key].id)
})

describe('CategoriesTest', () => {
  it('All categories must have an id', () => {
    Object.keys(SavingsGoalCategories).forEach(function (key) {
      var id = SavingsGoalCategories[key].id
      expect(id).toEqual(expect.anything())
    })

    Object.keys(WithdrawCategories).forEach(function (key) {
      var id = WithdrawCategories[key].id
      expect(id).toEqual(expect.anything())
    })

    Object.keys(DepositCategories).forEach(function (key) {
      var id = DepositCategories[key].id
      expect(id).toEqual(expect.anything())
    })

    Object.keys(TaskCategories).forEach(function (key) {
      var id = TaskCategories[key].id
      expect(id).toEqual(expect.anything())
    })
  })

  it('All categories must have a color', () => {
    Object.keys(SavingsGoalCategories).forEach(function (key) {
      var color = SavingsGoalCategories[key].color
      expect(color).toEqual(expect.anything())
    })

    Object.keys(WithdrawCategories).forEach(function (key) {
      var color = WithdrawCategories[key].color
      expect(color).toEqual(expect.anything())
    })

    Object.keys(DepositCategories).forEach(function (key) {
      var color = DepositCategories[key].color
      expect(color).toEqual(expect.anything())
    })

    Object.keys(TaskCategories).forEach(function (key) {
      var color = TaskCategories[key].color
      expect(color).toEqual(expect.anything())
    })
  })

  it('All categories must have an image', () => {
    Object.keys(SavingsGoalCategories).forEach(function (key) {
      var image = SavingsGoalCategories[key].image
      expect(image).toEqual(expect.anything())
    })

    Object.keys(WithdrawCategories).forEach(function (key) {
      var image = WithdrawCategories[key].image
      expect(image).toEqual(expect.anything())
    })

    Object.keys(DepositCategories).forEach(function (key) {
      var image = DepositCategories[key].image
      expect(image).toEqual(expect.anything())
    })

    Object.keys(TaskCategories).forEach(function (key) {
      var image = TaskCategories[key].image
      expect(image).toEqual(expect.anything())
    })
  })

  it('All category images must start with /', () => {
    Object.keys(SavingsGoalCategories).forEach(function (key) {
      var image = SavingsGoalCategories[key].image
      expect(image.charAt(0)).toEqual('/')
    })

    Object.keys(WithdrawCategories).forEach(function (key) {
      var image = WithdrawCategories[key].image
      expect(image.charAt(0)).toEqual('/')
    })

    Object.keys(DepositCategories).forEach(function (key) {
      var image = DepositCategories[key].image
      expect(image.charAt(0)).toEqual('/')
    })

    Object.keys(TaskCategories).forEach(function (key) {
      var image = TaskCategories[key].image
      expect(image.charAt(0)).toEqual('/')
    })
  })

  it('Category ids must be unique in SavingsGoalCategories', () => {
    Object.keys(SavingsGoalCategories).forEach(function (key) {
      var id = SavingsGoalCategories[key].id
      SavingsGoalCategoryIds.splice(SavingsGoalCategoryIds.indexOf(id), 1)
      expect(SavingsGoalCategoryIds).not.toContain(id)
    })
  })

  it('Category ids must be unique in WithdrawCategories', () => {
    Object.keys(WithdrawCategories).forEach(function (key) {
      var id = WithdrawCategories[key].id
      WithdrawCategoryIds.splice(WithdrawCategoryIds.indexOf(id), 1)
      expect(WithdrawCategoryIds).not.toContain(id)
    })
  })

  it('Category ids must be unique in DepositCategories', () => {
    Object.keys(DepositCategories).forEach(function (key) {
      var id = DepositCategories[key].id
      DepositCategoryIds.splice(DepositCategoryIds.indexOf(id), 1)
      expect(DepositCategoryIds).not.toContain(id)
    })
  })

  it('Category ids must be unique in TaskCategories', () => {
    Object.keys(TaskCategories).forEach(function (key) {
      var id = TaskCategories[key].id
      TaskCategoryIds.splice(TaskCategoryIds.indexOf(id), 1)
      expect(TaskCategoryIds).not.toContain(id)
    })
  })

  it('CategoryGroup must exist in CategoryGroups object or be undefined', () => {
    Object.keys(SavingsGoalCategories).forEach(function (key) {
      var categoryGroup = SavingsGoalCategories[key].categoryGroup
      if (categoryGroup)
        expect(categoryGroupArray).toContain(categoryGroup)
    })

    Object.keys(WithdrawCategories).forEach(function (key) {
      var categoryGroup = WithdrawCategories[key].categoryGroup
      if (categoryGroup)
        expect(categoryGroupArray).toContain(categoryGroup)
    })

    Object.keys(DepositCategories).forEach(function (key) {
      var categoryGroup = DepositCategories[key].categoryGroup
      if (categoryGroup)
        expect(categoryGroupArray).toContain(categoryGroup)
    })

    Object.keys(TaskCategories).forEach(function (key) {
      var categoryGroup = TaskCategories[key].categoryGroup
      if (categoryGroup)
        expect(categoryGroupArray).toContain(categoryGroup)
    })
  })
})
