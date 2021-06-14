class ChatRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_room_channel_#{params[:room_id]}"
    stream_from "chat_room_channel_#{params[:name]}"
    # params => js 에서 consumer.subscriptions.create 시에 넘겨준 값

    host = Room.find_by(room_id: params[:room_id]).host
    unless(params[:ishost])
      ActionCable.server.broadcast "chat_room_channel_#{host}", {body: {type: 'sync host', sent_by: params[:name]}, sender: params[:name]}
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def to_all(data)  
    ActionCable.server.broadcast "chat_room_channel_#{data["room_id"]}", {body: data["body"], sender: data["sender"]}
  end

  def to_one(data)
    ActionCable.server.broadcast "chat_room_channel_#{data["name"]}", {body: data["body"], sender: data["sender"]}
  end
end
