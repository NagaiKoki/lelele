module.exports = {
  types: [
    { value: "feat", name: "* feat:    add new feature" },
    { value: "fix", name: "* fix:    bugs fix" },
    {
      value: "refactor",
      name: "* refactor:    code change that are NOT fix or feat",
    },
    {
      value: "chore",
      name: "* chore:    No production code change like config",
    },
    {
      value: "wip",
      name: "* WIP:    TMP commit",
    },
    { value: "docs", name: "* docs:    docs like README change" },
    { value: "test", name: "* test:    test codes change" },
  ],
  scopes: ["apps", "packages", "others"],
  messages: {
    type: "Select the type of change that you're committing:\n",
    subject: "Write a commit message:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?:\n",
  },

  allowCustomScopes: true,
  skipQuestions: ["body", "footer"],
  subjectLimit: 150,
};
