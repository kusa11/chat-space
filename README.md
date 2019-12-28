## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|null: false, add_index: true|
|user_id|references|null: false, add_index: true|
|group_id|references|null: false, add_index: true|

## Association
-  belongs_to :group
-  belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

## Association
- has_many :groups_users
- has_many :groups, through: groups_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: true|

## Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :messages
