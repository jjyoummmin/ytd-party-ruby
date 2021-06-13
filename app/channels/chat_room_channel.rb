class ChatRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_room_channel_#{params[:room_id]}"
    stream_from "chat_room_channel_#{"김아무개"}"
    # params => js 에서 consumer.subscriptions.create 시에 넘겨준 값
    puts "===================================="
    # 김아무개 => current_user
    # if(false){
    #   ActionCable.server.broadcast "chat_room_channel_#{host}", {type: 'sync host', sent_by: "김아무개"}
    # }
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def to_all(data)
    ActionCable.server.broadcast "chat_room_channel_#{data["room_id"]}", data["body"]
  end

  def to_one(data)
    ActionCable.server.broadcast "chat_room_channel_#{data["name"]}", data["body"]
  end
end
