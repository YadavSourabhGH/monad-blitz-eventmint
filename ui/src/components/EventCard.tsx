import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "./ui/button";
import { PinContainer } from "./ui/3d-pin";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  ticketsLeft: number;
  totalTickets: number;
}

export const EventCard = ({
  id,
  title,
  date,
  location,
  price,
  image,
  ticketsLeft,
  totalTickets,
}: EventCardProps) => {
  return (
    <PinContainer
      title={title}
      href={`/event/${id}`}
      containerClassName="w-full h-[30rem]"
    >
      <div className="flex flex-col w-[20rem] h-[26rem] bg-gradient-to-b from-slate-900/90 to-black/90 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden group-hover/pin:border-white/20 transition-all duration-500">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover/pin:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Tickets Left Badge */}
          <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md border border-white/20 text-white">
            {ticketsLeft}/{totalTickets} Left
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-white line-clamp-2 group-hover/pin:text-primary transition-colors">
            {title}
          </h3>

          {/* Event Details */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{location}</span>
            </div>
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-white">{price}</span>
              <span className="text-sm text-gray-400">MON</span>
            </div>

            <Button 
              variant="gradient" 
              size="sm"
              className="relative overflow-hidden group/btn"
            >
              <span className="relative z-10">Buy Ticket</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer transition-opacity" />
            </Button>
          </div>
        </div>
      </div>
    </PinContainer>
  );
};
